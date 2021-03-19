import { ReactChildren } from 'react';
import tagList from './tagList';

export type TTemplateStringList = string[];

export type TTemplateExpressionList = (string | ((props: any) => string))[];

export type TComp = {
    children: string | ReactChildren;
    className: string;
    props: any[];
};

export type TTypeList = typeof tagList[number];

export type TClaxed = {
    // TODO: Understand the best way for type the result
    [key in TTypeList]: any;
};