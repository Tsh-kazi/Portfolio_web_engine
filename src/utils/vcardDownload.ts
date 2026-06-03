import portfolioData from "@/data/portfolioData.json";

export function triggerVCardDownload(): void {
  if (typeof window === 'undefined') return;

  const { profile, links } = portfolioData;
  const secondaryPhone = profile.secondaryPhone ? `\nTEL;TYPE=CELL,VOICE:${profile.secondaryPhone}` : '';
  
  const vcardData = `BEGIN:VCARD
VERSION:3.0
FN:${profile.name}
N:Kazi;Tshibaza;Christian;;
TITLE:${profile.title}
TEL;TYPE=WORK,VOICE:${profile.phone}${secondaryPhone}
EMAIL;TYPE=PREF,INTERNET:${profile.email}
URL:${links.linkedin}
NOTE:${profile.status}
END:VCARD`;

  const blob = new Blob([vcardData], { type: "text/vcard" });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.href = url;
  link.download = "Tshibaza_Kazi_Contact.vcf";
  
  document.body.appendChild(link);
  link.click();
  
  // Cleanup
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
