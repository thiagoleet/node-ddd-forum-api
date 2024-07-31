import { Notification } from "../../enterprise/entities";

export interface NotificationsRepository {
  create(notification: Notification): Promise<void>;
}
