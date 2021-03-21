import { ReactChildren, FunctionComponent, ComponentClass, ReactNode } from 'react';
import tagList from './tagList';

export type TFactory = (
    strings: TemplateStringsArray,
    ...keys: TTemplateExpressionList
) => ReactNode

export type TReactElement<P extends {}> = FunctionComponent<P> | ComponentClass<P> | string

export type TTemplateStringList = string[];

export type TTemplateExpressionList = (string | ((props: any) => string))[];

export type TComp = {
    children: string | ReactChildren;
    className: string;
    props: any[];
};

export type TTypeList = typeof tagList[number];

export type TClaxed = {
    [key in TTypeList]: () => ReactNode
};