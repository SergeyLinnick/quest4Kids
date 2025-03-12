"use server";
import { profileService } from "./services";

export const fetchProfile = async (): Promise<any> => {
  return await profileService.getProfile({
    cache: "force-cache",
    next: {
      tags: ["profile-data"],
      revalidate: 60,
    },
  });
};
