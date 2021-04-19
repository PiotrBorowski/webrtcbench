import { createFFmpeg, CreateFFmpegOptions } from "@ffmpeg/ffmpeg";

export const createFFmpegInstance = async (options?: CreateFFmpegOptions) => {
  const ffmpeg = createFFmpeg(options);
  await ffmpeg.load();

  return ffmpeg;
};

export const testFFmpeg = async () => {
  const ffmpeg = await createFFmpegInstance({ log: true });
  ffmpeg.run("-protocols");
};
