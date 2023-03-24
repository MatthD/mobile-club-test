import { IsUrl } from 'class-validator';

export class MinifyUrlDto {
  @IsUrl()
  public readonly url: string;
}

export class ResolveUrlDto {
  @IsUrl()
  public readonly url: string;
}
