import { NotificationsRepository } from "@/domain/notification/application/repositories/notifications.repository";
import { Notification } from "@/domain/notification/enterprise/entities";

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  private _items: Notification[];

  constructor() {
    this._items = [];
  }

  get items() {
    return this._items;
  }

  async create(notification: Notification): Promise<void> {
    this._items.push(notification);
  }
}
