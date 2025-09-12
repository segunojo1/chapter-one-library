import Image from "next/image";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="auth-container">
      <section className="auth-form">
        <div className="auth-box">
          <Image
            src="/icons/logo.svg"
            alt="Hero Image"
            height={37}
            width={37}
          />
          <h1 className="text-2xl font-semibold text-white">ChapterOne</h1>
        </div>

        <div>{children}</div>
      </section>

      <section className="auth-illustration">
        <Image
          src="/images/auth-illustration.png"
          alt="Hero Image"
          height={1000}
          width={1000}
          className="size-full object-cover"
        />
      </section>
    </main>
  );
};

export default Layout;
