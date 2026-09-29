declare module "*.PNG" {
  import type { StaticImageData } from "next/image";

  const image: StaticImageData;
  export default image;
}
