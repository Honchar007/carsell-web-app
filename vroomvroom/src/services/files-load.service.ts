// apis
import CommonApi from '@/api/common.api';

class FilesLoadService {
  async loadFile(fileUri: string | null, token: string | null = null): Promise<string> {
    if (!fileUri) {
      return '';
    }

    if (fileUri.match(/^(blob:)?http(s)?:\/\//)) {
      return fileUri;
    }

    try {
      const file = await CommonApi.getFile(fileUri, token);
      return URL.createObjectURL(file);
      // eslint-disable-next-line
    } catch (e: any) {
      console.error(e);
    }

    return '';
  }

  getFileUri(fileUri: string | null, token: string | null = null): string {
    if (!fileUri) {
      return '';
    }

    if (fileUri.match(/^(blob:)?http(s)?:\/\//)) {
      return fileUri;
    }

    return `${process.env.VUE_APP_API_URL}/api/File?fileUri=${fileUri}&access_token=${token}`;
  }
}

export default new FilesLoadService();
