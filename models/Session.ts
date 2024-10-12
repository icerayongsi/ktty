import { t } from "elysia";

import { __nullable__ } from "./__nullable__";

export const SessionPlain = t.Object(
  {
    id: t.String({ additionalProperties: true }),
    userId: t.String({ additionalProperties: true }),
    expiresAt: t.Date({ additionalProperties: true }),
  },
  { additionalProperties: true },
);

export const SessionRelations = t.Object(
  {
    user: t.Object(
      { id: t.String({ additionalProperties: true }) },
      { additionalProperties: true },
    ),
  },
  { additionalProperties: true },
);

export const SessionPlainInputCreate = t.Object(
  { expiresAt: t.Date({ additionalProperties: true }) },
  { additionalProperties: true },
);

export const SessionPlainInputUpdate = t.Object(
  { expiresAt: t.Date({ additionalProperties: true }) },
  { additionalProperties: true },
);

export const SessionRelationsInputCreate = t.Object(
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

export const SessionRelationsInputUpdate = t.Partial(
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

export const SessionWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object({
        AND: t.Union([Self, t.Array(Self)]),
        NOT: t.Union([Self, t.Array(Self)]),
        OR: t.Array(Self),
        id: t.String(),
        userId: t.String(),
        expiresAt: t.Date(),
      }),
    { $id: "Session" },
  ),
  { additionalProperties: true },
);

export const SessionWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect([
      t.Partial(t.Object({ id: t.String() })),
      t.Union([t.Object({ id: t.String() })]),
      t.Partial(
        t.Object({
          AND: t.Union([Self, t.Array(Self)]),
          NOT: t.Union([Self, t.Array(Self)]),
          OR: t.Array(Self),
        }),
      ),
      t.Partial(
        t.Object(
          { id: t.String(), userId: t.String(), expiresAt: t.Date() },
          { additionalProperties: true },
        ),
        { additionalProperties: true },
      ),
    ]),
  { $id: "Session" },
);

export const SessionSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      userId: t.Boolean(),
      expiresAt: t.Boolean(),
      user: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const SessionInclude = t.Partial(
  t.Object(
    { user: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const SessionOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")]),
      userId: t.Union([t.Literal("asc"), t.Literal("desc")]),
      expiresAt: t.Union([t.Literal("asc"), t.Literal("desc")]),
    },
    { additionalProperties: true },
  ),
  { additionalProperties: true },
);

export const Session = t.Composite([SessionPlain, SessionRelations], {
  additionalProperties: true,
});

export const SessionInputCreate = t.Composite(
  [SessionPlainInputCreate, SessionRelationsInputCreate],
  { additionalProperties: true },
);

export const SessionInputUpdate = t.Composite(
  [SessionPlainInputUpdate, SessionRelationsInputUpdate],
  { additionalProperties: true },
);
