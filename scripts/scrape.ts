
import puppeteer from 'puppeteer';
import TurndownService from 'turndown';
import * as fs from 'fs/promises';
import { URL } from 'url';

const MAX_DEPTH = 3; // Maximum recursion depth
const OUTPUT_FILE = 'knowledge_base.md';

const visited = new Set<string>();
const turndownService = new TurndownService();

// Configure turndown to clean up potential noise
turndownService.remove('script');
turndownService.remove('style');

// Helper to normalize URLs
function normalizeUrl(url: string): string {
    try {
        const u = new URL(url);
        // Remove fragments
        u.hash = '';
        // Remove trailing slash for consistency
        if (u.pathname.endsWith('/')) {
            u.pathname = u.pathname.slice(0, -1);
        }
        return u.href;
    } catch (e) {
        return url;
    }
}

async function scrape(url: string, depth: number, browser: any) {
    const cleanUrl = normalizeUrl(url);

    if (visited.has(cleanUrl)) return;
    visited.add(cleanUrl);
    
    if (depth > MAX_DEPTH) return;

    console.log(`[Depth ${depth}] Scraping: ${cleanUrl}`);

    const page = await browser.newPage();
    
    // Set a decent viewport
    await page.setViewport({ width: 1280, height: 800 });

    let links: string[] = [];
    let contentMarkdown = '';
    let title = '';

    try {
        await page.goto(cleanUrl, { waitUntil: 'networkidle2', timeout: 60000 });
        
        title = await page.title();

        // Extract content and clean it up a bit before markdown conversion
        const html = await page.evaluate(() => {
            // Clone body to avoid messing up the page interactions (though we are closing it anyway)
            const body = document.body.cloneNode(true) as HTMLElement;
            
            // Remove common interactive/non-content elements
            const selector = 'script, style, nav, footer, iframe, svg, [role="navigation"], .nav, .footer, #header, #footer';
            const elements = body.querySelectorAll(selector);
            elements.forEach(el => el.remove());
            
            return body.innerHTML;
        });

        contentMarkdown = turndownService.turndown(html);

        // Extract internal links for recursion
        if (depth < MAX_DEPTH) {
            const rawLinks = await page.evaluate(() => {
                return Array.from(document.querySelectorAll('a'))
                    .map(a => a.href)
                    .filter(href => href && href.startsWith('http'));
            });
            links = rawLinks;
        }

    } catch (error) {
        console.error(`Failed to scrape ${cleanUrl}:`, error);
        await page.close();
        return; // Skip saving if failed
    }

    await page.close();

    // Check if meaningful content was found
    if (contentMarkdown && contentMarkdown.length > 100) {
        const entry = `
---
# Page: ${title}
# URL: ${cleanUrl}
# Captured: ${new Date().toISOString()}

${contentMarkdown}
`;
        await fs.appendFile(OUTPUT_FILE, entry);
    }

    // Process links sequentially to avoid overloading
    const domain = new URL(cleanUrl).hostname;
    
    for (const link of links) {
        try {
            const linkUrl = new URL(link);
            // Only follow links on the same domain
            if (linkUrl.hostname === domain) {
                await scrape(link, depth + 1, browser);
            }
        } catch (e) {
            // Invalid URL, ignore
        }
    }
}

async function main() {
    const startUrl = process.argv[2];
    if (!startUrl) {
        console.error('Usage: npx tsx scripts/scrape.ts <URL>');
        process.exit(1);
    }

    // Initialize/Clear the output file
    await fs.writeFile(OUTPUT_FILE, `<!-- Knowledge Base for ${startUrl} -->\n`);
    console.log(`Starting scrape of ${startUrl}... output will be saved to ${OUTPUT_FILE}`);

    const browser = await puppeteer.launch({
        headless: true,
    });

    await scrape(startUrl, 0, browser);

    await browser.close();
    console.log('Scraping complete.');
}

main().catch(console.error);
