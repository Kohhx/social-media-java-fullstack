export class FileUtil {

  static getExtension(filename: string) {
    return filename.split('.').pop();
  }

  static isImage(filename: string) {
    const ext = this.getExtension(filename);
    if (ext) {
      return ext.toLowerCase() === 'jpg' || ext.toLowerCase() === 'png'
      || ext.toLowerCase() === 'jpeg' || ext.toLowerCase() === 'gif'
      || ext.toLowerCase() === 'bmp' || ext.toLowerCase() === 'svg'
      || ext.toLowerCase() === 'webp' || ext.toLowerCase() === 'ico'
      || ext.toLowerCase() === 'tif' || ext.toLowerCase() === 'tiff';
    }
    return false;
  }

  static isVideo(filename: string) {
    const ext = this.getExtension(filename);
    if (ext) {
      return ext.toLowerCase() === 'mp4' || ext.toLowerCase() === 'webm'
      || ext.toLowerCase() === 'mkv' || ext.toLowerCase() === 'flv'
      || ext.toLowerCase() === 'avi' || ext.toLowerCase() === 'wmv'
      || ext.toLowerCase() === 'mov' || ext.toLowerCase() === '3gp'
      || ext.toLowerCase() === 'mpeg' || ext.toLowerCase() === 'mpg';
    }
    return false;
  }

  static isVideoOrImage(filename: string) {
    if (filename === null || filename === undefined) {
      return true
    }
    const ext = this.getExtension(filename);
    if (ext) {
      return this.isImage(filename) || this.isVideo(filename);
    }
    return false;
  }
}
