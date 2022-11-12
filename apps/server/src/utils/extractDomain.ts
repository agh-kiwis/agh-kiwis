export const extractDomainFromUrl = (url: string) => {
    // Match on http/https and ://
    const matches = url.match(/^https?:\/\/([^/?#]+)(?:[/?#]|$)/i);
    const domain = matches && matches[1];
    // Remove port number
    return domain && domain.split(':')[0];
}


