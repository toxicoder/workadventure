import { describe, expect, it, vi, beforeEach } from "vitest";
import { mock, mockReset } from "vitest-mock-extended";
import axios from "axios";
import { adminApi } from "../src/Services/AdminApi";
import { ADMIN_API_TOKEN, ADMIN_API_URL } from "../src/Enum/EnvironmentVariable";

vi.mock("axios");
const mockedAxios = vi.mocked(axios, true);

describe("AdminApi", () => {
    beforeEach(() => {
        mockReset(mockedAxios);
    });

    it("should fetch map details", async () => {
        // GIVEN
        const mapDetails = {
            type: "mapDetails",
            wamUrl: "http://example.com/map.wam",
            mapUrl: "http://example.com/map.json",
            areas: [],
        };
        mockedAxios.get.mockResolvedValue({ data: mapDetails });
        ADMIN_API_URL.value = "http://localhost:3000";
        ADMIN_API_TOKEN.value = "test_token";

        // WHEN
        const result = await adminApi.fetchMapDetails("http://example.com");

        // THEN
        expect(result).toEqual(mapDetails);
        expect(mockedAxios.get).toHaveBeenCalledWith("http://localhost:3000/api/map", {
            headers: { Authorization: "test_token" },
            params: { playUri: "http://example.com" },
        });
    });

    it("should return a room redirect", async () => {
        // GIVEN
        const roomRedirect = {
            type: "roomRedirect",
            url: "http://example.com/redirect",
        };
        mockedAxios.get.mockResolvedValue({ data: roomRedirect });
        ADMIN_API_URL.value = "http://localhost:3000";
        ADMIN_API_TOKEN.value = "test_token";

        // WHEN
        const result = await adminApi.fetchMapDetails("http://example.com");

        // THEN
        expect(result).toEqual(roomRedirect);
    });

    it("should return an error when the server returns an error", async () => {
        // GIVEN
        mockedAxios.get.mockRejectedValue(new Error("Network Error"));
        ADMIN_API_URL.value = "http://localhost:3000";
        ADMIN_API_TOKEN.value = "test_token";

        // WHEN
        const result = await adminApi.fetchMapDetails("http://example.com");

        // THEN
        expect(result).toEqual({
            status: "error",
            type: "error",
            title: "Connection error",
            subtitle: "Something wrong happened while fetching map details!",
            image: "",
            code: "ROOM_ACCESS_ERROR",
            details: "Network Error",
        });
    });
});
