export interface iPagin { 
    total: number,
    per_page: number,
    offset: number,
    to: number,
    last_page: number,
    current_page: number,
    from: number,
}

export interface iUser {
    id: string,
    username: string,
}

export interface iSelect {
    value: string,
    label: string,
}


export interface iTenant{
  address:string,
  storage_used:string,
  usage_db:string,
  billing_active:string,
  api:string,
  backoffice:string,
  created_at:string,
  databases:string,
  email:string,
  frontend:string,
  id:string,
  id_service:string,
  monthly_billing:number,
  note:string
  responsible:string
  server_name:string
  service:string
  telp:string
  title:string
  totalrecords:string
  updated_at:string
}

export interface iService {
    id: string,
    title: string,
    type: number,
}

export interface iBilling{
  id:string,
  id_tenant:string,
  tenant:string,
  period:number,
  due_date:string,
  amount:string,
  service:string,
  status:number,
  id_service:string,
  created_at:string,
  updated_at:string
  server_name:string
  tenant_service:string
}
