export interface IComponentsState {
    display: string;
    memory: { [key: string]: string | null };
    address_memory_on: string | null;
    pc: string;
    pc_on: boolean;
    mar: string;
    mar_on: boolean;
    ibr: string;
    ibr_on: boolean;
    ir: string;
    ir_on: boolean;
    ac: string;
    ac_on: boolean;
    cal_on: boolean;
    codop: string | null;
    codop_on: boolean; 
    re: string;
    re_on: boolean;
    pc_mar: boolean;
    mar_memory: boolean;
    memory_mbr: boolean;
    mbr_ibr: boolean;
    ibr_ir: boolean;
    mbr_cal: boolean;
    ac_cal: boolean;
    cal_ac: boolean;
    cal_mbr: boolean;
}