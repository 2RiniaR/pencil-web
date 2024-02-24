import { siteDomain, siteName, siteUrl } from "~/libs/const";

type Props = {
  title: string;
  thumbnail: string | undefined;
};

export const OgImage = ({ title, thumbnail }: Props) => (
  <div
    style={{
      display: "flex",
      position: "relative",
      background: "linear-gradient(to bottom, #8791a3 0%, #6c717a 100%)",
      width: "100%",
      height: "100%",
      color: "#dddddd",
      border: "solid 24px rgba(221, 221, 221, 0.7)"
    }}
  >
    <img
      style={{
        position: "absolute",
        width: 416,
        height: 234,
        left: 368,
        top: 70,
        border: "solid 4px rgba(221, 221, 221, 0.7)",
        borderRadius: 4
      }}
      src={thumbnail ?? `${siteUrl}/default_thumbnail.png`}
      alt={title}
    />
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 42,
        fontStyle: "normal",
        fontWeight: "bold",
        position: "absolute",
        width: 800,
        height: 100,
        top: 330,
        left: 176
      }}
    >
      <p
        style={{
          margin: 0,
          textAlign: "center"
        }}
      >
        {title}
      </p>
    </div>
    <img
      style={{
        position: "absolute",
        borderRadius: 1000,
        width: 160,
        height: 160,
        left: -32,
        bottom: -32
      }}
      src={`${siteUrl}/icon.jpg`}
      alt="アイコン"
    />
    <div
      style={{
        fontSize: 32,
        fontWeight: 400,
        position: "absolute",
        width: 400,
        left: 148,
        bottom: 16
      }}
    >
      {siteName}
    </div>
    <div
      style={{
        fontSize: 32,
        fontWeight: 400,
        position: "absolute",
        right: 16,
        bottom: 16,
        textAlign: "right"
      }}
    >
      {siteDomain}
    </div>
  </div>
);
