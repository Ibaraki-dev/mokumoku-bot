export class ConnpassClient {
  async getLatestEventUrlFromGroupPage(groupPageUrl: string) {
    const EVENT_LIST_TITLE_SELECTOR =
      "div.group_event_inner > p.event_title > a";
    const urls: string[] = [];
    const elementHandler = {
      element(el: Element) {
        const href = el.getAttribute("href");
        if (href) {
          urls.push(href);
        }
      },
    };
    const response = await fetch(groupPageUrl);
    await new HTMLRewriter()
      .on(EVENT_LIST_TITLE_SELECTOR, elementHandler)
      .transform(response)
      .text();
    if (urls.length === 0) {
      throw new Error("最新のイベントURLが取得できませんでした。");
    }
    return urls[0];
  }
}
