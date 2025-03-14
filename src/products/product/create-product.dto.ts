import { Type } from "class-transformer"
import { IsNumber, IsString, Min } from "class-validator"

export class CreateProductDto {
    @IsString(  {message: "Name must be a string"})
    public name : string

    @IsNumber({maxDecimalPlaces: 4}, {message: "Price must be a number"})
    @Min(0, {message: "Price must be greater than 0"})
    @Type(() => Number)
    public price : number
}
