package ssafy.e105.Seiren.domain.notify.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.e105.Seiren.domain.notify.entity.Notify;
import ssafy.e105.Seiren.global.common.sse.NotificationType;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class NotifyResponse {

    private String content;
    private Boolean isRead;
    private NotificationType notificationType;
    private LocalDateTime createdAt;

    public NotifyResponse(Notify notify) {
        this.content = notify.getContent();
        this.isRead = notify.getIsRead();
        this.notificationType = notify.getNotificationType();
        this.createdAt = notify.getCreatedAt();
    }
}
