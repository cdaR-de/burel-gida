
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const contentDirectory = path.join(process.cwd(), 'content');
const publicDirectory = path.join(process.cwd(), 'public');

// Helper to get all MDX files
function getContentFiles(type) {
    const dir = path.join(contentDirectory, type);
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir).filter(file => /\.mdx?$/.test(file));
}

// Helper to read MDX file
function readContentFile(type, filename) {
    const fullPath = path.join(contentDirectory, type, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const slug = filename.replace(/\.(tr|en)?\.mdx?$/, '');

    // Determine locale from filename or default to 'en'
    const locale = filename.includes('.tr.mdx') ? 'tr' : 'en';

    return {
        slug,
        locale,
        data,
        content
    };
}

function generateSearchIndex() {
    const searchIndex = [];

    console.log('Generating search index...');

    // Process Blog
    const blogFiles = getContentFiles('blog');
    blogFiles.forEach(file => {
        const post = readContentFile('blog', file);
        searchIndex.push({
            type: 'blog',
            slug: post.slug,
            locale: post.locale,
            title: post.data.title,
            excerpt: post.data.excerpt,
            content: post.content,
            category: post.data.category,
            tags: post.data.tags || [],
            url: `/blog/${post.slug}`
        });
    });

    // Process Guides
    const guideFiles = getContentFiles('guides');
    guideFiles.forEach(file => {
        const guide = readContentFile('guides', file);
        searchIndex.push({
            type: 'guide',
            slug: guide.slug,
            locale: guide.locale,
            title: guide.data.title,
            excerpt: guide.data.description,
            content: guide.content,
            category: guide.data.difficulty,
            tags: guide.data.topics || [],
            url: `/guides/${guide.slug}`
        });
    });

    // Process FAQs
    try {
        const faqEn = require('../src/data/faq-en.json');
        faqEn.forEach(faq => {
            searchIndex.push({
                type: 'faq',
                slug: faq.id,
                locale: 'en',
                title: faq.question,
                excerpt: faq.answer.substring(0, 200),
                content: faq.answer,
                category: faq.category,
                url: `/faq#${faq.id}`
            });
        });

        const faqTr = require('../src/data/faq-tr.json');
        faqTr.forEach(faq => {
            searchIndex.push({
                type: 'faq',
                slug: faq.id,
                locale: 'tr',
                title: faq.question,
                excerpt: faq.answer.substring(0, 200),
                content: faq.answer,
                category: faq.category,
                url: `/faq#${faq.id}`
            });
        });
    } catch (e) {
        console.warn('Warning: Could not load FAQ data', e.message);
    }

    // Write to public folder
    if (!fs.existsSync(publicDirectory)) {
        fs.mkdirSync(publicDirectory);
    }

    fs.writeFileSync(
        path.join(publicDirectory, 'search-index.json'),
        JSON.stringify(searchIndex, null, 2) // Pretty print for easier debugging, minify in prod if needed
    );

    console.log(`Search index generated with ${searchIndex.length} items.`);
}

generateSearchIndex();
