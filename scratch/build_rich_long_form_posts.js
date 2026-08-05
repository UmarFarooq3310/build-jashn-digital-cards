const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../lib/blog/translations');
const LANGS = ['en', 'es', 'fr', 'ar', 'hi', 'zh', 'pt', 'ru', 'de', 'ja', 'ko', 'it', 'tr', 'id', 'ur', 'bn', 'vi', 'sw'];

function savePostFile(slug, fileIdx, dataMap, contentMap) {
  const ts = `import { LocalizedBlogData, LocalizedBlogContent } from './types'

export const POST_${fileIdx}_SLUG = "${slug}";

export const POST_${fileIdx}_DATA: Record<string, LocalizedBlogData> = ${JSON.stringify(dataMap, null, 2)};

export const POST_${fileIdx}_CONTENT: Record<string, LocalizedBlogContent> = ${JSON.stringify(contentMap, null, 2)};
`;
  fs.writeFileSync(path.join(targetDir, `post${fileIdx}.ts`), ts, 'utf8');
  console.log(`Saved long-form post${fileIdx}.ts`);
}

// Function to generate expanded multi-paragraph body text and 6 bullet points
function expandSection(sec, lang) {
  // If section already has long body text, preserve or expand it
  let expandedBody = sec.body;
  if (!expandedBody.includes("In addition") && !expandedBody.includes("Furthermore")) {
    expandedBody += " Furthermore, incorporating personalized digital cards on Cardzy provides a seamless experience for your guests with real-time updates, direct GPS directions, interactive RSVP buttons, and festive background audio.";
  }

  let expandedBps = [...(sec.bulletPoints || [])];
  if (expandedBps.length < 6) {
    expandedBps.push("Real-time instant updates without re-printing fees or delivery delays");
    expandedBps.push("Interactive 1-click WhatsApp RSVP confirmation button for hosts");
    expandedBps.push("Embedded Google Maps GPS venue navigation link for easy directions");
  }

  return {
    id: sec.id,
    title: sec.title,
    body: expandedBody,
    bulletPoints: expandedBps,
    highlight: sec.highlight
  };
}

// Function to expand FAQs to 5+ items
function expandFaqs(faqs) {
  const list = [...(faqs || [])];
  if (list.length < 5) {
    list.push({
      question: "Can I customize the background music and 3D animations?",
      answer: "Yes! Cardzy allows you to select custom festive tracks, animated gold foil effects, and personalized color palettes to match your event theme perfectly."
    });
    list.push({
      question: "How do guests access the digital card link?",
      answer: "Guests can open your card instantly by tapping a WhatsApp link or scanning a custom QR code on any smartphone without downloading any application."
    });
    list.push({
      question: "Can I export the RSVP responses into Excel or CSV?",
      answer: "Yes! You can view and download your complete guest headcount and dietary preference list anytime from your Cardzy host dashboard."
    });
  }
  return list;
}

// Process post files to enrich with expanded multi-paragraph text and 5+ FAQs
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(fileIdx => {
  const filePath = path.join(targetDir, `post${fileIdx}.ts`);
  if (!fs.existsSync(filePath)) return;

  const content = fs.readFileSync(filePath, 'utf8');
  const slugMatch = content.match(/export const POST_\d+_SLUG = "([^"]+)";/);
  const dataMatch = content.match(/export const POST_\d+_DATA: Record<string, LocalizedBlogData> = ({[\s\S]*?});\n\nexport const POST_\d+_CONTENT/);
  const contentMatch = content.match(/export const POST_\d+_CONTENT: Record<string, LocalizedBlogContent> = ({[\s\S]*?});\n?$/);

  if (slugMatch && dataMatch && contentMatch) {
    const slug = slugMatch[1];
    const dataObj = JSON.parse(dataMatch[1]);
    const contentObj = JSON.parse(contentMatch[1]);

    LANGS.forEach(l => {
      if (contentObj[l]) {
        contentObj[l].sections = contentObj[l].sections.map(sec => expandSection(sec, l));
        contentObj[l].faq = expandFaqs(contentObj[l].faq);
        if (!contentObj[l].conclusion.includes("Cardzy")) {
          contentObj[l].conclusion += " Experience the magic of luxury 3D digital cards on Cardzy today and make your celebrations truly unforgettable!";
        }
      }
    });

    savePostFile(slug, fileIdx, dataObj, contentObj);
  }
});
