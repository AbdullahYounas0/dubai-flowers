import * as React from 'react';

declare module '../components/sections/FlowerSeparator' {
  const FlowerSeparator: React.FC;
  export default FlowerSeparator;
}

declare module '../components/sections/CountriesGallery' {
  const CountriesGallery: React.FC;
  export default CountriesGallery;
}

declare module '../components/sections/HighlightsSection' {
  const HighlightsSection: React.ForwardRefExoticComponent<
    React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>
  >;
  export default HighlightsSection;
}

declare module '../components/sections/ContactSection' {
  const ContactSection: React.FC;
  export default ContactSection;
}
