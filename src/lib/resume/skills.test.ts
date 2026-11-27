import { describe, expect, it } from "vitest";
import { matchSkills } from "@/lib/resume/skills";

const names = (text: string) => matchSkills(text).map((hit) => hit.name).sort();

describe("matchSkills", () => {
  it("maps aliases to the canonical skill and keeps the JD's spelling", () => {
    const [hit] = matchSkills("Strong ReactJS experience");
    expect(hit).toMatchObject({ name: "React", spelling: "ReactJS" });
    expect(names("NodeJS, Postgres and RESTful services")).toEqual(["Node.js", "PostgreSQL", "REST APIs"]);
  });

  it("does not match a shorter skill inside a longer one", () => {
    expect(names("Strong JavaScript skills")).toEqual(["JavaScript"]);
    expect(names("Built with the Vercel AI SDK")).toEqual(["Vercel AI SDK"]);
    expect(names("Shipped React Native apps")).toEqual(["React Native"]);
  });

  it("lets a longer skill imply the one it contains", () => {
    expect(names("Deployed on AWS EC2")).toEqual(["AWS", "AWS EC2"]);
  });

  it("matches short terms only in their exact case", () => {
    expect(names("Uses JS and ML")).toEqual(["JavaScript", "Machine Learning"]);
    expect(names("let us ml this")).toEqual([]);
  });

  it("ignores generic certification words", () => {
    expect(names("data storage and cloud testing")).toEqual([]);
  });
});
