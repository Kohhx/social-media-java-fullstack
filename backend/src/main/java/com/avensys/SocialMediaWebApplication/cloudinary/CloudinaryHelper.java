package com.avensys.SocialMediaWebApplication.cloudinary;

import com.avensys.SocialMediaWebApplication.utility.FileUtil;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Component
public class CloudinaryHelper {

    @Autowired
    private Cloudinary cloudinary;

    public Map uploadImage(MultipartFile file) throws IOException {
        return cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
    }

    public Map delete(String publicId, String url) throws IOException {
        String fileType = FileUtil.getFileTypeFromExtension(url);
        return cloudinary.uploader().destroy(publicId, ObjectUtils.asMap("resource_type", fileType));
    }

    public Map uploadVideo(MultipartFile file) throws IOException {
        return cloudinary.uploader().uploadLarge(file.getBytes(), ObjectUtils.asMap("resource_type", "video"));
    }

    public Map upload(MultipartFile file) throws IOException {
        String mimeType = FileUtil.getFileTypeMimeType(file);
        if (mimeType.contains("video")) {
            return uploadVideo(file);
        }

        if (mimeType.contains("image")) {
            return uploadImage(file);
        }
        return null;
    }

}