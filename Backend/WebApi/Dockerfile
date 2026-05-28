FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy all project files first for better layer caching
COPY ApplicationCore/ApplicationCore.csproj ApplicationCore/
COPY Infrastructure/Infrastructure.csproj Infrastructure/
COPY WebApi/WebApi.csproj WebApi/
COPY WebApi/WebApi.sln WebApi/

# Restore from WebApi directory where the solution is
WORKDIR /src/WebApi
RUN dotnet restore WebApi.sln

# Copy everything else
WORKDIR /src
COPY . .

# Publish startup project
WORKDIR /src/WebApi
RUN dotnet publish WebApi.csproj -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://0.0.0.0:8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "WebApi.dll"]