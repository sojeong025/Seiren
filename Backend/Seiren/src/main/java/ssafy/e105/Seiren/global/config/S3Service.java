package ssafy.e105.Seiren.global.config;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ssafy.e105.Seiren.global.error.type.BaseException;
import ssafy.e105.Seiren.global.utils.ApiError;

@Service
@RequiredArgsConstructor
public class S3Service {

    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public byte[] downloadWavFile(String key) {
        S3Object s3Object = amazonS3Client.getObject(bucket, key);
        S3ObjectInputStream s3ObjectInputStream = s3Object.getObjectContent();

        try {
            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            byte[] buffer = new byte[1024];
            int bytesRead;
            while ((bytesRead = s3ObjectInputStream.read(buffer)) != -1) {
                byteArrayOutputStream.write(buffer, 0, bytesRead);
            }

            return byteArrayOutputStream.toByteArray();
        } catch (Exception e) {
            e.printStackTrace();
            throw new BaseException(new ApiError("s3 file download error", 0));
        } finally {
            try {
                s3ObjectInputStream.close();
            } catch (Exception e) {
                e.printStackTrace();
                throw new BaseException(new ApiError("s3ObjectInputStream close error", 0));
            }
        }
    }

    public String uploadZipFile(ByteArrayOutputStream byteArrayOutputStream,
            String fileName) {
        try {
            fileName = "zip/" + fileName + ".zip";

            InputStream inputStream = new ByteArrayInputStream(byteArrayOutputStream.toByteArray());

            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType("application/zip");
            metadata.setContentLength(byteArrayOutputStream.size());
            amazonS3Client.putObject(bucket, fileName, inputStream, metadata);
            return amazonS3Client.getResourceUrl(bucket, fileName);
        } catch (Exception e) {
            e.printStackTrace();
            throw new BaseException(
                    new ApiError("s3 file upload fail", 0));
        }
    }

    public String uploadWavFileManual(MultipartFile file) {
        try {
            String fileName = "records/" + file.getName();
            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentType(file.getContentType());
            InputStream inputStream = file.getInputStream();
            amazonS3Client.putObject(
                    new PutObjectRequest(bucket, fileName, inputStream, objectMetadata));
            return amazonS3Client.getResourceUrl(bucket, fileName);
        } catch (Exception e) {
            e.printStackTrace();
            throw new BaseException(new ApiError("uploadWavFileManual 실패", 0));
        }
    }
}
