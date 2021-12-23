import * as github from "@actions/github";
// import * as core from "@actions/core";
import { readFileSync } from "fs";
import { getPullRequestTitle, getRegex } from "../src";

describe("index", () => {
    describe("getPullRequestTitle", () => {
        beforeEach(() => {
            delete process.env["GITHUB_EVENT_PATH"];
        });
        it("can get the title from the context", () => {
            process.env["GITHUB_EVENT_PATH"] = __dirname + "/valid-context.json";
            github.context.payload = JSON.parse(
                readFileSync(process.env.GITHUB_EVENT_PATH, { encoding: 'utf8' })
            );
            const title = getPullRequestTitle();
            expect(title).toBe("Test Title");
        });

        it("raises an exception if the event is not for a pull_request", () => {
            process.env["GITHUB_EVENT_PATH"] = __dirname + "/wrong-event-type-context.json";
            github.context.payload = JSON.parse(
                readFileSync(process.env.GITHUB_EVENT_PATH, { encoding: 'utf8' })
            );
            expect(getPullRequestTitle).toThrowError("This action should only be run with Pull Request Events");
        })
    });

    describe("getRegex", () => {
        it("is a correct title", () => {
            const regex = getRegex();
            expect(regex.test("AB#1324 Is a valid title")).toBe(true);
        });

        it("is a incorrect title - missing title description", () => {
            const regex = getRegex();
            expect(regex.test("AB#1324")).toBe(false);
        });

        it("is a incorrect title - missing Azure Board reference", () => {
            const regex = getRegex();
            expect(regex.test("This title is invalid")).toBe(false);
        });
    });
});