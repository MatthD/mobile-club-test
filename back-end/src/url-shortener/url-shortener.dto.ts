import { IsUrl } from 'class-validator';

export class MinifyUrlDto {
  @IsUrl()
  public readonly url: string;
}
