import { t } from "elysia";

import { __nullable__ } from "./__nullable__";

export const PasswordPlain = t.Object(
  {
    id: t.Integer({ additionalProperties: true }),
    hashedPassword: t.String({ additionalProperties: true }),
    userId: t.String({ additionalProperties: true }),
  },
  { additionalProperties: true },
);

export const PasswordRelations = t.Object(
  {
    user: t.Object(
      { id: t.String({ additionalProperties: true }) },
      { additionalProperties: true },
    ),
  },
  { additionalProperties: true },
);

export const PasswordPlainInputCreate = t.Object(
  { hashedPassword: t.String({ additionalProperties: true }) },
  { additionalProperties: true },
);

export const PasswordPlainInputUpdate = t.Object(
  { hashedPassword: t.String({ additionalProperties: true }) },
  { additionalProperties: true },
);

export const PasswordRelationsInputCreate = t.Object(
  {
    user: t.Object(
      {
        connect: t.Object(
          {
            id: t.String({ additionalProperties: true }),
          },
          { additionalProperties: true },
        ),
      },
      { additionalProperties: true },
    ),
  },
  { additionalProperties: true },
);

export const PasswordRelationsInputUpdate = t.Partial(
  t.Object(
    {
      user: t.Object(
        {
          connect: t.Object(
            {
              id: t.String({ additionalProperties: true }),
            },
            { additionalProperties: true },
          ),
        },
        { additionalProperties: true },
      ),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const PasswordWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object({
        AND: t.Union([Self, t.Array(Self)]),
        NOT: t.Union([Self, t.Array(Self)]),
        OR: t.Array(Self),
        id: t.Integer(),
        hashedPassword: t.String(),
        userId: t.String(),
      }),
    { $id: "Password" },
  ),
  { additionalProperties: true },
);

export const PasswordWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect([
      t.Partial(t.Object({ id: t.Integer() })),
      t.Union([t.Object({ id: t.Integer() })]),
      t.Partial(
        t.Object({
          AND: t.Union([Self, t.Array(Self)]),
          NOT: t.Union([Self, t.Array(Self)]),
          OR: t.Array(Self),
        }),
      ),
      t.Partial(
        t.Object(
          { id: t.Integer(), hashedPassword: t.String(), userId: t.String() },
          { additionalProperties: true },
        ),
        { additionalProperties: true },
      ),
    ]),
  { $id: "Password" },
);

export const PasswordSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      hashedPassword: t.Boolean(),
      userId: t.Boolean(),
      user: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const PasswordInclude = t.Partial(
  t.Object(
    { user: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const PasswordOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")]),
      hashedPassword: t.Union([t.Literal("asc"), t.Literal("desc")]),
      userId: t.Union([t.Literal("asc"), t.Literal("desc")]),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const Password = t.Composite([PasswordPlain, PasswordRelations], {
  additionalProperties: true,
});

export const PasswordInputCreate = t.Composite(
  [PasswordPlainInputCreate, PasswordRelationsInputCreate],
  { additionalProperties: true },
);

export const PasswordInputUpdate = t.Composite(
  [PasswordPlainInputUpdate, PasswordRelationsInputUpdate],
  { additionalProperties: true },
);
