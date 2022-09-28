import { PlaylistFilter } from "./types";
import { getIdToken } from "../firebase";
import { z } from "zod";

export async function exportPlaylist(variables: {
  sourcePlaylistId: string;
  playlistName: string;
  filter: PlaylistFilter;
}): Promise<string> {
  const idToken = await getIdToken();
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_BASE_URL}/api/playlists/${
      variables.sourcePlaylistId
    }/export`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        playlistName: variables.playlistName,
        filter: variables.filter,
      }),
    }
  );

  const parsed = z
    .object({
      playlistId: z.string(),
    })
    .parse(await response.json());

  return parsed.playlistId;
}
