# lookersup_server_and_front
前段nodejs expressjs  requirejs jquery(ajax)去调用后端 springmvc 写接口获取数据

#使用maven过程中记录的问题
    Maven的隐式对象：
    ${basedir}：项目根目录
    ${project.build.directory}构建目录，缺省为target
    ${project.build.outputDirectory}构建过程输出目录，缺省为target/classes
    ${project.build.finalName}产生五名称，缺省${project.aritifactId} - ${project.version}
    ${project.packaging}打包类型，缺省为jar
    ${project.xxx}当前pom文件的任意节点的内容
    
    maven根据profile中定义的环境变量打包的设置详解：
    <profiles>
      <profile>
        <id>dev</id>
        <activation>
          <activeByDefault>true</activeByDefault>
        </activation>
        <build>
          <finalName>${project.artifactId}</finalName>
          <resources>
            <resource>
              <directory>src/main/resources</directory>
            </resource>
            <resource>
              <directory>src/main/properties</directory>
            </resource>
          </resources>
        </build>
      </profile>
      <profile>
        <id>test</id>
        <activation>
          <activeByDefault>false</activeByDefault>
        </activation>
        <build>
          <finalName>${project.artifactId}-test</finalName>
          <resources>
            <resource>
              <directory>src/main/resources</directory>
            </resource>
            <resource>
              <directory>src/test/properties</directory>
            </resource>
          </resources>
        </build>
      </profile>
      <profile>
        <id>pro</id>
        <activation>
          <activeByDefault>false</activeByDefault>
        </activation>
        <build>
          <finalName>${project.artifactId}-test</finalName>
          <resources>
            <resource>
              <directory>src/main/resources</directory>
            </resource>
            <resource>
              <directory>src/pro/properties</directory>
            </resource>
          </resources>
        </build>
      </profile>
    </profiles>
#maven plugin详解：
    <pluginManagement>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId> <!-- mvn install,maven 会自动将source install到repository。
                                                                 mvn deploy,maven会自动将source deploy 到 remote-repository
                                                                 mvn source:jar,单独打包源码
                                                            
                                                            -->
                <artifactId>maven-source-plugin</artifactId>
                <version>2.2.1</verison>
                <executions>
                    <execution>
                        <phase>compile</phase> <!--在什么阶段打包源文件：在编译器打包成jar文件 -->
						<goals>
							<goal>jar</goal>
						</goals>
                    </execution>
                </exrcutions>
            </plugin>
            <!--配置tomcat启动 -->
            <plugin>
				<groupId>org.codehaus.mojo</groupId>
				<artifactId>tomcat-maven-plugin</artifactId>
				<version>1.1</version>
				<configuration>
					<path>/</path>
					<port>8088</port>
				</configuration>
			</plugin>
			<!-- 配置war包 -->
			<plugin>
				<artifactId>maven-war-plugin</artifactId>
				<version>2.1.1</version>
				<!-- 打包成war包的路径-->
				<configuration>
					<warSourceDirectory>${basedir}/src/main/webapp</warSourceDirectory>
				</configuration>
				<executions>
					<execution>
						<id>default-war</id>
						<phase>package</phase>
						<goals>
							<goal>war</goal>
						</goals>
					</execution>
				</executions>
			</plugin>
			<!--指定JDK版本和编码。compile插件能解决：1.maven2.1默认用jdk1.3来编译，maven3 貌似是用jdk1.5，如果项目用的JDK1.6会有问题，compile插件可以指定JDK版本为1.6.
			2.windows默认使用GBK编码，但是一般java的斑马为utf8,需要在compile插件中指出，否则中文乱码可能出现编译错误
	        <plugin>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>2.3.2</version>
                 <configuration>
                    <source>1.6</source>
                    <target>1.6</target>
                    <encoding>UTF-8</encoding>
                 </configuration>
            </plugin>
        </plugins>
    </pluginManagement>
    
    <!-- 用于配置分发管理，配置相应的产品发布信息，主要用于发布，在执行mvn deploy后表示发布的位置 -->
    <distributionManagement>
    <repository>
      <id>nexus-releases</id>
      <name>Nexus Release Repository</name>
      <url>http://xxx.xx.xx.xx:port/content/repositories/releases/</url>
    </repository>
    <snapshotRepository>
      <id>nexus-snapshots</id>
      <name>Nexus Snapshot Repository</name>
      <url>http://xxx.xx.xx.xx:port/content/repositories/snapshots/</url>
    </snapshotRepository>
  </distributionManagement>
  
  
  Maven Repository  setting.xml:
  
    <!-- 配置本地仓库 -->
    <localRepository>/Users/allen/Project/res/repository</localRepository>

	<pluginGroups>
        
	</pluginGroups>

    <!-- 镜像--->
	<mirrors>
		<mirror>
			<id>nexus</id>
			<mirrorOf>*</mirrorOf>
			<name>Nexus Mirror</name>
			<url>http://xxxx.xx.xx.xx:prot/content/groups/public</url>
		</mirror>
	</mirrors>

    <!-- -->
	<profiles>
		<profile>
			<id>nexus</id>
			<repositories>
				<repository>
					<id>nexus</id>
					<name>local private nexus</name>
					<url>http://xxx.xx.xx.xx:prot/content/groups/public</url>
					<releases>
						<enabled>true</enabled>
					</releases>
					<snapshots>
						<enabled>true</enabled>
					</snapshots>
				</repository>
			</repositories>
			<pluginRepositories>
				<pluginRepository>
					<id>nexus</id>
					<name>local private nexus</name>
					<url>http://xxx.xx.xx.xx:prot/content/groups/public</url>
					<releases>
						<enabled>true</enabled>
					</releases>
					<snapshots>
						<enabled>true</enabled>
					</snapshots>
				</pluginRepository>
			</pluginRepositories>
		</profile>
	</profiles>

    <!-- -->
	<servers>
		<server>
			<id>nexus-releases</id>
			<username>username</username>
			<password>password</password>
		</server>
		<server>
			<id>nexus-snapshots</id>
			<username>username</username>
			<password>password</password>
		</server>
	</servers>

    <!-- -->
	<activeProfiles>
		<activeProfile>nexus</activeProfile>
	</activeProfiles>
</settings>

