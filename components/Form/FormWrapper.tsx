import { ReactNode } from "react";

type FormWrapperProps = {
  title: string;
  children: ReactNode;
};

export function FormWrapper({ title, children }: FormWrapperProps) {
  return (
    <>
      <h2
        className="text-center text-4xl font-bold text-black mt-10 "
        style={{ textAlign: "center", margin: 0, marginBottom: "2rem" }}
      >
        {title}
      </h2>
      <div
        style={{
          display: "block",
          width: "100%",
        }}
      >
        {children}
      </div>
    </>
  );
}
