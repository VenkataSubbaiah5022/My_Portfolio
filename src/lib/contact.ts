export const CONTACT_EMAIL = "venkatasubbaiah5022@gmail.com";

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

export function getWeb3FormsAccessKey() {
  return (
    process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim() ||
    process.env.WEB3FORMS_ACCESS_KEY?.trim() ||
    ""
  );
}

export async function sendViaWeb3Forms(payload: ContactPayload, accessKey: string) {
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: accessKey,
      name: payload.name,
      email: payload.email,
      message: payload.message,
      subject: `Portfolio Contact from ${payload.name}`,
      from_name: "Portfolio Contact Form",
      replyto: payload.email,
    }),
  });

  const data = await response.json().catch(() => null);
  const ok =
    response.ok &&
    data &&
    typeof data === "object" &&
    (data as { success?: boolean }).success === true;

  return { ok, data };
}
