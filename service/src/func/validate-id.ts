import { BadRequestException } from "@nestjs/common";
import { FormIdPrefix, WorkspaceIdPrefix } from "src/types/id.types";

export function validateId(id: string, prefix: WorkspaceIdPrefix | FormIdPrefix, isValidUlid: (ulid: string) => boolean) {
    const idPrefix = id.split("_")[0];
    const ulid = id.split("_")[1];
    if (idPrefix !== prefix || !isValidUlid(ulid)) {
        throw new BadRequestException("Workspace id is wrong");
    }
}