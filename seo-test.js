/**
 * SEO Test Script using Puppeteer
 * Tests all SEO improvements made to the Diara Manicure website
 */

const puppeteer = require('puppeteer');

const BASE_URL = 'http://localhost:3000';

async function runSEOTests() {
    console.log('🚀 Starting SEO Tests for Diara Manicure...\n');

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    const results = {
        passed: 0,
        failed: 0,
        tests: []
    };

    function logTest(name, passed, details = '') {
        const status = passed ? '✅' : '❌';
        console.log(`${status} ${name}${details ? `: ${details}` : ''}`);
        results.tests.push({ name, passed, details });
        if (passed) results.passed++;
        else results.failed++;
    }

    try {
        // Navigate to homepage
        console.log('📄 Testing Homepage...\n');
        await page.goto(BASE_URL, { waitUntil: 'networkidle0', timeout: 30000 });

        // Test 1: Title Tag
        const title = await page.title();
        logTest('Title Tag',
            title.includes('diara manicure.') && title.includes('Gélové nechty Trnava'),
            title
        );

        // Test 2: Meta Description
        const metaDesc = await page.$eval('meta[name="description"]', el => el.content).catch(() => '');
        logTest('Meta Description',
            metaDesc.includes('25€') && metaDesc.includes('Parkovanie zdarma'),
            metaDesc.substring(0, 80) + '...'
        );

        // Test 3: Canonical URL
        const canonical = await page.$eval('link[rel="canonical"]', el => el.href).catch(() => '');
        logTest('Canonical URL',
            canonical.includes('diaramanicure.sk'),
            canonical
        );

        // Test 4: hreflang Tag
        const hreflang = await page.$eval('link[hreflang="sk"]', el => el.href).catch(() => '');
        logTest('hreflang Tag (Slovak)',
            hreflang.includes('diaramanicure.sk'),
            hreflang || 'Not found'
        );

        // Test 5: H1 Tag
        const h1 = await page.$eval('h1', el => el.textContent).catch(() => '');
        logTest('H1 Tag',
            h1.includes('Gélové nechty Trnava') && h1.includes('diara manicure'),
            h1.substring(0, 60)
        );

        // Test 6: Open Graph Tags
        const ogTitle = await page.$eval('meta[property="og:title"]', el => el.content).catch(() => '');
        logTest('Open Graph Title',
            ogTitle.includes('diara manicure'),
            ogTitle
        );

        // Test 7: Schema Markup (LocalBusiness)
        const schemas = await page.$$eval('script[type="application/ld+json"]', scripts =>
            scripts.map(s => JSON.parse(s.textContent))
        );
        const hasLocalBusiness = schemas.some(s => s['@type'] === 'BeautySalon');
        logTest('LocalBusiness Schema', hasLocalBusiness,
            hasLocalBusiness ? 'BeautySalon schema found' : 'Not found'
        );

        // Test 8: FAQ Schema
        const hasFAQ = schemas.some(s => s['@type'] === 'FAQPage');
        logTest('FAQPage Schema', hasFAQ,
            hasFAQ ? 'FAQ schema found' : 'Not found'
        );

        // Test 9: BreadcrumbList Schema
        const hasBreadcrumb = schemas.some(s => s['@type'] === 'BreadcrumbList');
        logTest('BreadcrumbList Schema', hasBreadcrumb,
            hasBreadcrumb ? 'Breadcrumb schema found' : 'Not found'
        );

        // Test 10: Favicon
        const favicon = await page.$eval('link[rel="icon"]', el => el.href).catch(() => '');
        logTest('Favicon', favicon.includes('favicon.png'), favicon);

        // Test 11: Apple Touch Icon
        const appleIcon = await page.$eval('link[rel="apple-touch-icon"]', el => el.href).catch(() => '');
        logTest('Apple Touch Icon', appleIcon.includes('apple-touch-icon'), appleIcon || 'Not found');

        // Test 12: Keywords Meta Tag
        const keywords = await page.$eval('meta[name="keywords"]', el => el.content).catch(() => '');
        logTest('Keywords Meta Tag',
            keywords.includes('nechty trnava') && keywords.includes('gelove nechty'),
            keywords.substring(0, 50) + '...'
        );

        // Test 13: Images have alt text
        const images = await page.$$eval('img', imgs => imgs.map(i => ({ src: i.src, alt: i.alt })));
        const imagesWithAlt = images.filter(i => i.alt && i.alt.length > 5);
        logTest('Images with Alt Text',
            imagesWithAlt.length >= images.length * 0.8,
            `${imagesWithAlt.length}/${images.length} images have alt text`
        );

        // Test 14: Security Headers (check response)
        const response = await page.goto(BASE_URL);
        const headers = response.headers();
        logTest('X-Content-Type-Options Header',
            headers['x-content-type-options'] === 'nosniff',
            headers['x-content-type-options'] || 'Not set'
        );

        // Test Blog Page
        console.log('\n📄 Testing Blog Page...\n');
        await page.goto(`${BASE_URL}/blog`, { waitUntil: 'networkidle0', timeout: 30000 });

        const blogTitle = await page.title();
        logTest('Blog Page Title',
            blogTitle.includes('Blog'),
            blogTitle
        );

        const blogH1 = await page.$eval('h1', el => el.textContent).catch(() => '');
        logTest('Blog H1 Tag', blogH1.includes('Blog'), blogH1);

    } catch (error) {
        console.error('❌ Test Error:', error.message);
    }

    await browser.close();

    // Summary
    console.log('\n' + '='.repeat(50));
    console.log(`\n📊 SEO TEST SUMMARY`);
    console.log(`✅ Passed: ${results.passed}`);
    console.log(`❌ Failed: ${results.failed}`);
    console.log(`📈 Score: ${Math.round((results.passed / (results.passed + results.failed)) * 100)}%\n`);

    return results;
}

// Run tests
runSEOTests().catch(console.error);
