import type { Metadata } from "next";
import { ContentSection } from "@/components/content-section";
import { PageShell } from "@/components/page-shell";
import { SiteFooter } from "@/components/site-footer";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Krang Privacy Policy | Shift Shift Co.",
  description: "Privacy information for the Krang golf-cart telemetry and navigation app.",
};

export default function KrangPrivacyPage() {
  return (
    <PageShell tone="krang">
      <ContentSection>
        <p className={styles.eyebrow}>Krang</p>
        <h1 className={styles.title}>Krang Privacy Policy</h1>
        <p className={styles.meta}>Effective date: September 3, 2026</p>
        <p className={styles.body}>
          This privacy policy explains how Krang, developed by Shift Shift Co. LLC, may access and
          use information when you use the app.
        </p>
      </ContentSection>

      <ContentSection>
        <h2 className={styles.heading}>Information Krang may access</h2>
        <p className={styles.body}>
          Krang may access information needed to provide navigation, map display, destination
          search, and communication with compatible vehicle hardware. Depending on how you use the
          app, this may include location information, Bluetooth-related information, search terms,
          and vehicle telemetry received from supported hardware.
        </p>
      </ContentSection>

      <ContentSection>
        <h2 className={styles.heading}>Location information</h2>
        <p className={styles.body}>
          Krang uses Apple Core Location to support navigation, route guidance, and live
          positioning. Location information may be accessed while the app is in use and, if you
          grant the relevant permission, during features that require continuous location updates.
        </p>
      </ContentSection>

      <ContentSection>
        <h2 className={styles.heading}>Bluetooth and vehicle communication</h2>
        <p className={styles.body}>
          Krang uses Bluetooth to communicate with compatible Krang or Project Cartier vehicle
          hardware. Through that connection, the app may receive live telemetry or status data from
          the vehicle systems in order to display it to the driver and support related features.
        </p>
      </ContentSection>

      <ContentSection>
        <h2 className={styles.heading}>Maps and destination search</h2>
        <p className={styles.body}>
          Krang uses Apple MapKit and local search functionality for map display, routing, and
          destination search. Search requests and map-related information may be processed by Apple
          as part of providing those services.
        </p>
      </ContentSection>

      <ContentSection>
        <h2 className={styles.heading}>How information is used</h2>
        <p className={styles.body}>
          Information accessed by Krang is used to operate navigation features, show your position
          on the map, communicate with supported vehicle hardware, and display vehicle telemetry and
          route information inside the app.
        </p>
      </ContentSection>

      <ContentSection>
        <h2 className={styles.heading}>Data sharing</h2>
        <p className={styles.body}>
          Shift Shift Co. LLC does not intend to sell personal data collected through Krang. Krang
          may rely on Apple services such as MapKit, local search, Core Location, and platform
          Bluetooth frameworks to provide app functionality. Other than service providers involved
          in delivering those features or disclosures required by law, no additional data-sharing
          practices are represented here.
        </p>
      </ContentSection>

      <ContentSection>
        <h2 className={styles.heading}>Data retention</h2>
        <p className={styles.body}>
          Krang does not currently require a user account. Data retention may depend on how
          information is handled on the device, by Apple system services, or by connected vehicle
          hardware. This policy does not make broader claims about retention beyond what is
          necessary to describe the app conservatively today.
        </p>
      </ContentSection>

      <ContentSection>
        <h2 className={styles.heading}>Children</h2>
        <p className={styles.body}>
          Krang is not directed to children under 13, and Shift Shift Co. LLC does not intend to
          knowingly collect personal information from children through the app.
        </p>
      </ContentSection>

      <ContentSection>
        <h2 className={styles.heading}>Changes to this privacy policy</h2>
        <p className={styles.body}>
          This privacy policy may be updated from time to time. If changes are made, the updated
          version will be posted on this page with a revised effective date.
        </p>
      </ContentSection>

      <ContentSection>
        <h2 className={styles.heading}>Contact</h2>
        <p className={styles.body}>
          Questions about this privacy policy or Krang can be sent to{" "}
          <a href="mailto:support@shiftshift.co" className={styles.link}>
            support@shiftshift.co
          </a>
          .
        </p>
      </ContentSection>

      <SiteFooter>© 2026 Shift Shift Co. LLC</SiteFooter>
    </PageShell>
  );
}
