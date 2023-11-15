import { modelOptions, prop, getModelForClass } from "@typegoose/typegoose";


@modelOptions({schemaOptions: {timestamps: true}})
export class Product {
    public _id!: string

    @prop({required:true})
    public name!: string

    @prop({required:true})
    public description!: string

    @prop({required:true})
    public category!: string

    @prop ({required: true, unique: true})
    public id!: number

    @prop ({required: true, default: 0})
    public price!: number

    @prop ({required: true, default: 0})
    public stock!: number

    @prop({required:true})
    public image!: string

    @prop({ required: true, default: 0 })
    public quantity!: number;

}

export const ProductModel = getModelForClass(Product)