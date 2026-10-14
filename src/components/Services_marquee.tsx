import './Services_marquee.css';

const marqueeText = 'JAM NAIL SPA  ✦  CLASSIC MANICURE  ✦  GEL MANICURE  ✦  SOFT GEL & POLYGEL EXTENSIONS  ✦  SIGNATURE NAIL ART  ✦  CLASSIC PEDICURE  ✦  SIGNATURE FOOT SPA  ✦  JAM SIGNATURE SWEDISH MASSAGE  ✦  JAM SIGNATURE FUSION MASSAGE  ✦  HOT STONE THERAPY  ✦  HUMAN HAIR EYELASH EXTENSIONS  ✦  LASH LIFT  ✦  BROW LAMINATION  ✦  FULL BODY WAXING  ✦  RELAX. RENEW. REPEAT.  ✦ ';

export default function ServicesMarquee() {
  return (
    <section id="services_marquee" className="services-marquee" aria-label="Our treatments">
      <p className="services-marquee-accessible">{marqueeText}</p>
      <div className="services-marquee-track" aria-hidden="true">
        {[0, 1].map((copy) => (
                    <span className="services-marquee-text" key={copy}>
            {marqueeText.split('\u2726').map((text, index, parts) => (
              <span key={index}>
                {text.trim()}
                {index < parts.length - 1 && (
                  <span className="services-marquee-separator">{'\u2726'}</span>
                )}
              </span>
            ))}
          </span>
        ))}
      </div>
    </section>
  );
}

