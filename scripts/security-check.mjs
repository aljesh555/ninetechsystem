/**
 * Greps the build output for anything CLAUDE.md section 2 forbids publishing.
 * Runs against dist/ after a build.
 */
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const BANNED = [
  [/\bPAN\s*(no|number|:)/i, 'PAN number'],
  [/\bVAT\s*(no|number|reg)/i, 'VAT registration number'],
  [/registration\s*(no|number)/i, 'company registration number'],
  [/\bcompany\s*reg\b/i, 'company registration'],
  [/share\s*capital/i, 'share capital'],
  [/sharehold/i, 'shareholding'],
  [/citizenship\s*(no|number)/i, 'citizenship number'],
  [/\bincorporat/i, 'incorporation detail'],
  [/account\s*(no|number)/i, 'bank account number'],
  [/\bIBAN\b|\bSWIFT\b/i, 'bank identifier'],
  [/merchant\s*id/i, 'merchant ID'],
  [/\beSewa\s*(id|qr)/i, 'eSewa merchant detail'],
  [/khalti\s*(id|qr)/i, 'Khalti merchant detail'],
  [/\bn8n\b/i, 'internal tool stack (n8n)'],
  [/\bclaude\b/i, 'internal tool stack (Claude)'],
  [/\banthropic\b/i, 'internal tool stack'],
  [/\bastro\b/i, 'internal framework name'],
  [/\bcloudflare\b/i, 'hosting provider'],
  [/\bresend\b/i, 'email provider'],
  [/\bwrangler\b/i, 'deploy tooling'],
  [/award[- ]winning|world[- ]class|cutting[- ]edge|game[- ]changer/i, 'banned marketing word'],
  [/\b(leading|premier|#1|best in|top rated)\b/i, 'banned marketing word'],
  [/solutions provider|trusted partner|we are passionate/i, 'banned marketing phrase'],
  [/we guarantee[^.]{0,40}rank|guaranteed (top|first|number one|#1)[^.]{0,20}rank/i, 'ranking guarantee'],
  [/24\/7/i, 'round-the-clock promise we cannot keep'],
  [/RESEND_API_KEY\s*[:=]\s*\S/i, 'API key value'],
  [/sk-[A-Za-z0-9]{16,}|re_[A-Za-z0-9]{16,}/, 'API key value'],
];

// Phrases that are fine in context and would otherwise trip the grep above.
const ALLOWED = [
  /Nobody can guarantee a Google ranking/i,
  /No, and neither can anyone else/i,
  /we do not\./i,
];

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (/\.(html|txt|xml|js|css|json|webmanifest|svg)$/.test(e.name)) out.push(p);
  }
  return out;
}

const TOOL_STACK = /internal tool stack|hosting provider|email provider|deploy tooling|internal framework/;

const files = await walk('dist');
let hits = 0;
for (const f of files) {
  const text = await readFile(f, 'utf8');
  for (const [re, label] of BANNED) {
    // robots.txt names AI crawlers on purpose; those are user-agent strings.
    if (f.endsWith('robots.txt') && TOOL_STACK.test(label)) continue;
    const m = text.match(re);
    if (!m) continue;
    const i = text.indexOf(m[0]);
    const context = text.slice(Math.max(0, i - 70), i + 90).replace(/\s+/g, ' ');
    if (ALLOWED.some((a) => a.test(context))) continue;
    hits++;
    console.log(`  ${f}: ${label}\n      …${context}…`);
  }
}

// Directors' personal details must appear nowhere.
for (const f of files) {
  const text = await readFile(f, 'utf8');
  const phones = [...text.matchAll(/(?<![\d])(?:\+?977[\s-]?)?(9[678]\d{8})(?![\d])/g)];
  for (const m of phones) {
    if (m[1] !== '9843325804') { hits++; console.log(`  ${f}: unexpected mobile number ${m[0]}`); }
  }
  const emails = [...text.matchAll(/[\w.+-]+@[\w.-]+\.\w+/g)].map((m) => m[0]);
  for (const e of emails) {
    if (!/^(info|website)@ninetechsystem\.com$/.test(e) && !e.includes('schema.org')) {
      hits++; console.log(`  ${f}: unexpected email address ${e}`);
    }
  }
}

console.log(hits === 0 ? '\n  security check: clean\n' : `\n  security check: ${hits} item(s) to review\n`);
process.exit(hits ? 1 : 0);
