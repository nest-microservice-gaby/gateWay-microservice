export enum OrderStatus {
    PENDING = 'PENDING',
    DELIVERED= 'DELIVERED',
    CANCELLED= 'CANCELLED',
    PROCESSING= 'PROCESSING'
}

export const OrderStatusList = Object.values(OrderStatus);