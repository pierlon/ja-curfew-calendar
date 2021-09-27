import { domain } from './lib/constants'

// todo: add favicon and og images

export default {
    defaultTitle: 'Jamaica Curfew Calendar',
    description: 'Keep up to date with the ongoing curfews in Jamaica',
    additionalMetaTags: [
        {
            property: 'theme-color',
            // todo: update dynamically from `color-primary`.
            content: '#059669',
        },
    ],
    additionalLinkTags: [
        {
            rel: 'icon',
            href: ':data',
        },
    ],
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: `https://${domain}/`,
      site_name: 'Jamaica Curfew Calendar',
      images: [
          {
              url: `https://${domain}/og_image.jpg`,
              width: 1200,
              height: 700,
              type: 'image/jpeg',
          }
      ]
    },
    twitter: {
      handle: '@pie_rlo',
      site: '@pie_rlo',
      cardType: 'summary_large_image',
    },
};
