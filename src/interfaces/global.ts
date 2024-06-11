
export interface  ModalProps {
    open: boolean,
    handleClose: () => void
    item?: any
}

interface Header {
    title: string;
    value: string;
}

interface BodyItem {
    id: number;
    [key: string]: any;
}

export interface  ModalProps {
    open: boolean,
    handleClose: () => void
    item?: any
}

// export interface PaginationProps {
//     page: number,
//     setParams: (value:number) => void
// }

export interface TableProps {
    headers: Header[];
    body: BodyItem[];
    isLoading: boolean;
    deleteItem:(id:any) => void
    editItem:(item:any) => void 
}

export interface Params{
    limit:number,
    page:number
}
// export interface PaginationProps {
//     totalCount: number,
//     page: number,
//     setParams: (params:Params) => void
// }

export interface SingleTableProps {
    headers: Header[];
    body: BodyItem[];
    isLoading: boolean;
    deleteItem:(id:number) => void
    editItem:(item:any) => void
}

export interface PaginationProps {
    totalCount: number,
    page: number,
    setParams: (value:number) => void
}
