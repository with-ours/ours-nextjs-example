"use client"
import styles from "@/app/page.module.css";
import ours from "ours-web-sdk";

export function TrackButton() {
  return <button className={styles.secondary} onClick={() => ours.track('button_click')}>Track me</button>;
}