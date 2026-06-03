import portfolioData from "@/data/portfolioData.json";

export function generateVCard(): string {
  const { profile, links } = portfolioData;
  return `BEGIN:VCARD
VERSION:3.0
FN:${profile.name}
N:Kazi;Tshibaza;;;
TITLE:${profile.title}
TEL;TYPE=WORK,VOICE:${profile.phone}
EMAIL;TYPE=PREF,INTERNET:${profile.email}
URL:${links.linkedin}
NOTE:${profile.status}
END:VCARD`;
}

export function downloadVCard(): void {
  const vcardData = generateVCard();
  const blob = new Blob([vcardData], { type: "text/vcard" });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.href = url;
  link.download = "christian_kazi_contact.vcf";
  
  document.body.appendChild(link);
  link.click();
  
  // Cleanup
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
