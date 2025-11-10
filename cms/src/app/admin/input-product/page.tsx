'use client';

import styles from './InputProduct.module.css';
import { ImagePlaceholderIcon } from '../layout'; // Import icon dari layout

export default function InputProductPage() {
  return (
    <div className={styles.page}>
      <form className={styles.form}>
        <div className={styles.header}>
          <h1>Input Products Name...</h1>
          <p>Subheading</p>
        </div>

        <div className={styles.imageUpload}>
          <ImagePlaceholderIcon />
          <p>Click or drag file to this area to upload</p>
        </div>

        <label htmlFor="price" className={styles.label}>
          Input Price...
        </label>
        <input id="price" type="text" className={styles.input} />

        <label htmlFor="description" className={styles.label}>
          Body text describing what this product is...
        </label>
        <textarea
          id="description"
          className={styles.textarea}
          rows={6}
        ></textarea>

        <button type="submit" className={styles.submitButton}>
          Submit
        </button>

        <p className={styles.finePrint}>
          Text box for additional details or fine print
        </p>
      </form>
    </div>
  );
}