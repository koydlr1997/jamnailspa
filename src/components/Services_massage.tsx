import { useRef, type CSSProperties } from "react";
import "./Services.css";
import "./Services_massage.css";

const temporaryImages = [
  { src: "/assets/services/massage.png", alt: "Relaxing massage treatment" },
  { src: "/assets/massagebanner.png", alt: "Spa and massage atmosphere" },
  { src: "/assets/banner1.png", alt: "Jam Nail Spa treatment preview" },
  { src: "/assets/banner2.png", alt: "Spa care preview" },
  { src: "/assets/banner3.png", alt: "Relaxation treatment preview" },
];

const massageCards = Array.from({ length: 15 }, (_, index) => ({
  id: index + 1,
  area: String.fromCharCode(97 + index),
  image: temporaryImages[index % temporaryImages.length],
}));

// Each letter represents one photo; shared tracks keep the mosaic gapless.
const desktopLayout = [
  "aaabbccddeee", "aaaffccgheee",
  "iijffkkghlll", "iijmmkknolll",
];
const mobileLayout = [
  "aabbcc", "aaddcc", "eeffgg",
  "hhffii", "jjkkll", "mmnnoo",
];

function layoutAreas(layout: string[]) {
  return layout.map((row) => `"${row.split("").join(" ")}"`).join(" ");
}

const mosaicStyle = {
  "--desktop-areas": layoutAreas(desktopLayout),
  "--mobile-areas": layoutAreas(mobileLayout),
} as CSSProperties;

export default function ServicesMassage() {
  const hoverOrder = useRef(0);

  return (
    <section
      id="services-massage"
      className="services services-massage"
      aria-labelledby="services-massage-heading"
    >
      <header className="services-header">
        <p className="services-title">YOUR BODY IS THE TEMPLE OF YOUR SOUL,</p>
        <h2 id="services-massage-heading" className="services-heading">
          TAKE CARE OF IT.
        </h2>
      </header>
      <div
        className="massage-mosaic"
        style={mosaicStyle}
      >
        {massageCards.map((card) => (
          <div
            className="massage-card"
            key={card.id}
            style={{ gridArea: card.area }}
            onPointerEnter={(event) => {
              if (!window.matchMedia(
                "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
              ).matches || event.pointerType !== "mouse") return;

              const slot = event.currentTarget;
              const mosaic = slot.parentElement!.getBoundingClientRect();
              const bounds = slot.getBoundingClientRect();
              const previewWidth = Math.min(
                mosaic.width * (window.innerWidth >= 768 ? 0.22 : 0.3),
                mosaic.height * 0.64,
              );
              const centerX = bounds.left + bounds.width / 2;
              const centerY = bounds.top + bounds.height / 2;
              const previewHeight = previewWidth * 1.25;
              const targetX = Math.max(mosaic.left + previewWidth / 2,
                Math.min(centerX, mosaic.right - previewWidth / 2));
              const targetY = Math.max(mosaic.top + previewHeight / 2,
                Math.min(centerY, mosaic.bottom - previewHeight / 2));

              slot.style.setProperty("--hover-shift-x", `${targetX - centerX}px`);
              slot.style.setProperty("--hover-shift-y", `${targetY - centerY}px`);
              // Keep outgoing previews below the newest one until they finish shrinking.
              slot.style.zIndex = String(++hoverOrder.current);
            }}
            onTransitionEnd={(event) => {
              if (event.propertyName === "width" && !event.currentTarget.matches(":hover")) {
                event.currentTarget.style.zIndex = "";
              }
            }}
          >
            <div className="massage-card-photo">
              <img
                src={card.image.src}
                alt={card.image.alt}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
