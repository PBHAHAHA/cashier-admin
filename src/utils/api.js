import http from "./http";

// 批量上传图片
export const uploadImageUrls =
    import.meta.env.VITE_API + '/api/upload/images';
// 以图搜款时上传图片
export const searchImageUrls =
    import.meta.env.VITE_API + '/api/search/getProductsByFile';
// 以图搜款时上传图片
export const productBatchUploadUrls =
    import.meta.env.VITE_API + '/api/product/upload/batch';
// 文件上传header参数
export const uploadUrlHeader = () => (
    {
        Authorization: localStorage.getItem('YYDANHONGTOKEN')+1
    }
)

// 登录
export const login = ((params) => http.post('/login', params));

// 厂商管理-保存 编辑
export const supplierSave = ((params) => http.post('/api/supplier/save', params));
// 厂商管理-分页搜索列表
export const supplierListPage = ((params) => http.post('/api/supplier/listPage', params));
// 厂商管理-删除
export const supplierDelete = ((params) => http.post('/api/supplier/delete', params));
// 厂商管理-所在街道
export const supplierListStreet = ((params) => http.post('/api/supplier/listStreet', params));
// 厂商管理-联想搜索
export const supplierListByName = ((params) => http.post('/api/supplier/listByName', params));

// 商品管理-保存 编辑
export const productSave = ((params) => http.post('/api/product/save', params));
// 商品管理-分页搜索列表
export const productListPage = ((params) => http.post('/api/product/listPage', params));
// 商品管理-删除
export const productListDelete = ((params) => http.post('/api/product/delete', params));
// 商品管理-详情
export const productListDetail = ((params) => http.get(`/api/product/detail/${params.id}`));

// 备货单管理-供应商获取备货单
export const ordersPage = (params) => http.post(`/api/orders/page`, params);

// 以图搜款
export const getProductsByImage = ((params) => http.post(`/api/search/getProductsByImage`, params));
