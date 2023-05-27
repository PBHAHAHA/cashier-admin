import http from "./http";

// 房间列表
export const getRoomInfoApi = (() => http.get('/get_room_info'));
// 房间设置
export const setRoomInfoApi = ((params) => http.post('/set_room_info', params))

// 获取商品信息
export const getCommodityInfoApi = (() => http.get('/get_commodity_info'))
// 设置商品信息
export const setCommodityInfoApi = ((params) => http.post('/set_commodity_info',params))

// 获取历史订单信息
export const getHistoryOrderInfo = (() => http.get('/get_history_order_info'))
// 删除历史信息
export const delHistoryOrderInfo = ((params) => http.post('/del_history_order_info', params))
