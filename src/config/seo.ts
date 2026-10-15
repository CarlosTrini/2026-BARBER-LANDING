/**
 * Configuración global de SEO para el proyecto Astro.
 * Todo es configurable y extensible para cualquier página o sección.
 */

export interface SiteConfig {
  name: string;
  title: string;
  titleTemplate: string;
  description: string;
  url: string;
  author: string;
  locale: string;
  themeColor: string;
  defaultOgImage: string;
  twitter: {
    handle: string;
    site: string;
    cardType: 'summary' | 'summary_large_image' | 'app' | 'player';
  };
  organization: {
    name: string;
    logo: string;
    url: string;
    sameAs: string[];
  };
}

export const siteConfig: SiteConfig = {
  name: 'BARBER Studio',
  title: 'BARBER Studio | Barbería Moderna & Grooming de Precisión',
  titleTemplate: '%s | BARBER Studio',
  description: 'Barbería moderna y minimalista de alto impacto. Cortes de precisión, visagismo, ritual de afeitado tradicional a navaja libre con toallas calientes y grooming integral masculino.',
  url: 'https://barberstudio.com',
  author: 'BARBER Studio Grooming Team',
  locale: 'es_MX',
  themeColor: '#0a0a0c',
  defaultOgImage: 'https://picsum.photos/seed/barber-og/1200/630',
  twitter: {
    handle: '@barberstudiomx',
    site: '@barberstudiomx',
    cardType: 'summary_large_image',
  },
  organization: {
    name: 'BARBER Studio',
    logo: 'https://barberstudio.com/favicon.svg',
    url: 'https://barberstudio.com',
    sameAs: [
      'https://instagram.com/barberstudio',
      'https://facebook.com/barberstudio',
    ],
  },
};

/**
 * Interfaz de propiedades SEO para componentes y layouts.
 */
export interface SEOProps {
  title?: string;
  titleTemplate?: string;
  description?: string;
  canonical?: string | URL;
  image?: string;
  imageAlt?: string;
  ogType?: 'website' | 'article' | 'profile' | 'book';
  noindex?: boolean;
  nofollow?: boolean;
  author?: string;
  keywords?: string[];
  locale?: string;
  themeColor?: string;
  publishDate?: Date | string;
  modifiedDate?: Date | string;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    tags?: string[];
    section?: string;
  };
  schema?: Record<string, any> | Record<string, any>[];
}

/**
 * Generador de Schemas de datos estructurados JSON-LD (Schema.org)
 */
export function generateDefaultSchemas(pageUrl: string, seoProps: SEOProps) {
  const schemas: Record<string, any>[] = [];

  // Schema de WebSite
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: seoProps.description || siteConfig.description,
    inLanguage: seoProps.locale || siteConfig.locale,
  });

  // Schema de Organización
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.organization.name,
    url: siteConfig.organization.url,
    logo: siteConfig.organization.logo,
    sameAs: siteConfig.organization.sameAs,
  });

  // Schema de Artículo si aplica
  if (seoProps.ogType === 'article' && seoProps.article) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: seoProps.title || siteConfig.title,
      description: seoProps.description || siteConfig.description,
      image: seoProps.image ? new URL(seoProps.image, siteConfig.url).toString() : new URL(siteConfig.defaultOgImage, siteConfig.url).toString(),
      datePublished: seoProps.article.publishedTime,
      dateModified: seoProps.article.modifiedTime || seoProps.article.publishedTime,
      author: {
        '@type': 'Person',
        name: seoProps.article.author || seoProps.author || siteConfig.author,
      },
      publisher: {
        '@type': 'Organization',
        name: siteConfig.organization.name,
        logo: {
          '@type': 'ImageObject',
          url: siteConfig.organization.logo,
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': pageUrl,
      },
    });
  }

  // Si se pasaron schemas personalizados adicionales
  if (seoProps.schema) {
    if (Array.isArray(seoProps.schema)) {
      schemas.push(...seoProps.schema);
    } else {
      schemas.push(seoProps.schema);
    }
  }

  return schemas;
}
