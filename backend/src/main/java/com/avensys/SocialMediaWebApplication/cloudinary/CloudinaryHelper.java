package com.avensys.SocialMediaWebApplication.cloudinary;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.apache.tika.Tika;
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

    public Map deleteImage(String publicId) throws IOException {
        return cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
    }

    public Map uploadVideo(MultipartFile file) throws IOException {
        return cloudinary.uploader().uploadLarge(file.getBytes(), ObjectUtils.asMap("resource_type", "video"));
    }

    public Map upload(MultipartFile file) throws IOException {
        String mimeType = getExtension(file);
        if (mimeType.contains("video")) {
            return uploadVideo(file);
        }

        if (mimeType.contains("image")) {
            return uploadImage(file);
        }
        return null;
    }

    private String getExtension(MultipartFile file) throws IOException {
        Tika tika = new Tika();
        String mimeType = tika.detect(file.getInputStream());
        return mimeType;
    }
}