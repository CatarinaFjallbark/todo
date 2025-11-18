import { OpenAPIV3 } from "openapi-types";

export const swaggerSpec: OpenAPIV3.Document = {
  openapi: "3.0.3",
  info: {
    title: "Todos API",
    description: "API for managing todos with pagination, CRUD, and sorting.",
    version: "1.0.0"
  },
  paths: {
    "/api/todos": {
      get: {
        summary: "Get paginated todos",
        description:
          "Returns a paginated list of todos, sorted so that unchecked items appear first.",
        parameters: [
          {
            name: "page",
            in: "query",
            required: false,
            schema: { type: "integer", minimum: 1 },
            description: "Page number to retrieve (default 1)"
          }
        ],
        responses: {
          200: {
            description: "List of todos",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Todo" }
                    },
                    pagination: {
                      type: "object",
                      properties: {
                        page: { type: "integer" },
                        totalPages: { type: "integer" }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      post: {
        summary: "Create a new todo",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["title"],
                properties: {
                  title: { type: "string" },
                  id: { type: "string" }
                }
              }
            }
          }
        },
        responses: {
          201: {
            description: "Todo created",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Todo" }
              }
            }
          },
          400: { description: "Title is missing" }
        }
      },
      patch: {
        summary: "Update a todo",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["id"],
                properties: {
                  id: { type: "string" },
                  title: { type: "string" },
                  description: { type: "string" },
                  dueDate: { type: "string" },
                  checked: { type: "boolean" }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: "Todo updated",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Todo" }
              }
            }
          },
          400: { description: "Id is missing" },
          404: { description: "Todo not found" }
        }
      },
      delete: {
        summary: "Delete a todo",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["id"],
                properties: {
                  id: { type: "string" }
                }
              }
            }
          }
        },
        responses: {
          204: { description: "Todo deleted — no content returned" },
          400: { description: "Id is missing" }
        }
      }
    }
  },
  components: {
    schemas: {
      Todo: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          description: { type: "string", nullable: true },
          dueDate: { type: "string", nullable: true },
          checked: { type: "boolean", nullable: true }
        }
      }
    }
  }
};
